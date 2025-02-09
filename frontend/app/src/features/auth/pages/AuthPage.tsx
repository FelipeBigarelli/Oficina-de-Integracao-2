import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import { getUser, isAuthenticated, login, signUp } from "../services/Authentication";

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Verifica se o usuário já está autenticado ao carregar o componente
    useEffect(() => {
        if (isAuthenticated()) {
            const user = getUser();
            // Redireciona para a rota apropriada com base no tipo de usuário
            if (user?.is_admin) {
                navigate('/docente');
            } else {
                navigate('/voluntario');
            }
        }
    }, [navigate]);

    // Função auxiliar para tratar erros de forma consistente
    const handleError = (err: any) => {
        const errorMessage = err.message.includes("Failed to fetch")
            ? "Erro de conexão: Não foi possível alcançar o servidor."
            : err.message;
        setError(errorMessage);
        // Limpa a mensagem de erro após 5 segundos
        setTimeout(() => setError(null), 5000);
    };

    const handleSignUp = async (data: Record<string, string>) => {
        try {
            setError(null); // Limpa erros anteriores
            await signUp({
                name: data.name,
                email: data.email,
                RA: data.ra,
                password: data.password,
            });
            
            // Mostra mensagem de sucesso e muda para tela de login
            setError("Conta criada com sucesso! Faça login para continuar.");
            setIsLogin(true);
        } catch (err: any) {
            handleError(err);
        }
    };
    
    const handleLogin = async (data: Record<string, string>) => {
        try {
            setError(null); // Limpa erros anteriores
            const response = await login({
                email: data.email,
                password: data.password,
            });

            // O token já é armazenado na função de login
            // Redireciona com base no tipo de usuário
            if (response.user.is_admin) {
                navigate("/docente");
            } else {
                navigate("/voluntario");
            }
        } catch (err: any) {
            handleError(err);
        }
    };
    
    return (
        <div className="w-full h-screen flex">
            {/* Lado esquerdo da tela */}
            <div className="w-1/2 flex flex-col bg-[#282c34] items-center justify-center">
                <div className="w-full flex flex-col max-w-[450px] mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        ELLP - Ensino Lúdico de Lógica, Programação e Robótica
                    </h1>
                </div>
            </div>

            {/* Lado direito da tela */}
            <div className="w-1/2 h-full bg-[#1a1a1a] flex flex-col p-20 justify-center">
                {/* Mensagem de erro ou sucesso */}
                {error && (
                    <div className={`mb-4 p-4 rounded ${error.includes('sucesso') ? 'bg-green-500' : 'bg-red-500'} text-white text-center`}>
                        {error}
                    </div>
                )}

                {isLogin ? (
                    <Form
                        key="login"
                        fields={[
                            { name: "email", type: "text", placeholder: "Email" },
                            { name: "password", type: "password", placeholder: "Senha" },
                        ]}
                        onSubmit={handleLogin}
                        title="Login"
                        buttonLabel="Log In"
                    />
                ) : (
                    <Form
                        key="signup"
                        fields={[
                            { name: "name", type: "text", placeholder: "Nome" },
                            { name: "email", type: "text", placeholder: "Email" },
                            { name: "ra", type: "text", placeholder: "RA" },
                            { name: "password", type: "password", placeholder: "Senha" },
                        ]}
                        onSubmit={handleSignUp}
                        title="Cadastro"
                        buttonLabel="Cadastrar"
                    />
                )}

                <div className="mt-4 text-center">
                    {isLogin ? (
                        <p className="text-white">
                            Não tem uma conta?{" "}
                            <button
                                className="text-blue-400 underline"
                                onClick={() => {
                                    setError(null);
                                    setIsLogin(false);
                                }}
                            >
                                Cadastre-se
                            </button>
                        </p>
                    ) : (
                        <p className="text-white">
                            Já tem uma conta?{" "}
                            <button
                                className="text-blue-400 underline"
                                onClick={() => {
                                    setError(null);
                                    setIsLogin(true);
                                }}
                            >
                                Faça login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}