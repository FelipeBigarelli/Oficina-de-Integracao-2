import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import { login , signUp } from "../services/Authentication";


export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true); // Alterna entre login e cadastro
    const navigate = useNavigate();
  
    const handleSignUp = async (data: Record<string, string>) => {
      try {
        await signUp({
          name: data.name,
          email: data.email,
          RA: data.ra,
          password: data.password,
        });
    
        console.log(data);
        setIsLogin(true); // Alterna para a tela de login após o sucesso
      } catch (err: any) {
        if (err.message.includes("Failed to fetch")) {
          throw new Error("Erro de conexão: Não foi possível alcançar o servidor.");
        } else {
          throw new Error(`Erro ao criar conta: ${err.message}`);
        }
      }
    };
    
    const handleLogin = async (data: Record<string, string>) => {
      try {
        const response = await login({
          email: data.email,
          password: data.password,
        });
        localStorage.setItem("authToken", response.token);
    
        if (response.isDocente) {
          navigate("/docente");
        } else {
          navigate("/voluntario");
        }
      } catch (err: any) {
        if (err.message.includes("Failed to fetch")) {
          throw new Error("Erro de conexão: Não foi possível alcançar o servidor.");
        } else {
          throw new Error(`Erro no login: ${err.message}`);
        }
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
          {isLogin ? (
            <Form
              key="login" // Identificador exclusivo
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
              key="signup" // Identificador exclusivo
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
                  onClick={() => setIsLogin(false)}
                >
                  Cadastre-se
                </button>
              </p>
            ) : (
              <p className="text-white">
                Já tem uma conta?{" "}
                <button
                  className="text-blue-400 underline"
                  onClick={() => setIsLogin(true)}
                >
                  Faça login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };