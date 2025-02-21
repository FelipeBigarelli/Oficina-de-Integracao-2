    import { useEffect, useState } from "react";
import { CertificateService } from "../services/CertificateService";

    interface Certificado {
    workshopId: string;
    userId: string;
    aluno: string;
    workshop: string;
    data: string;
    duracao: number;
    }

    export function useCertificates() {
    const [certificados, setCertificados] = useState<Certificado[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Estados do modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"success" | "error">("success");
    const [certificateUrl, setCertificateUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadCertificates = async () => {
        try {
            const certificadosApi = await CertificateService.listarCertificados();
            setCertificados(
            certificadosApi.map((item) => ({
                workshopId: item.id_workshop,
                userId: item.id_usuario,
                aluno: item.nome_usuario,
                workshop: item.nome_workshop,
                data: new Date(item.data_workshop).toLocaleDateString(),
                duracao: item.duracao_workshop,
            }))
            );
        } catch (err) {
            setError("Erro ao carregar lista de certificados");
        } finally {
            setLoading(false);
        }
        };

        loadCertificates();
    }, []);

    const emitirCertificado = async (workshopId: string, userId: string) => {
        try {
        const response = await CertificateService.emitirCertificado(workshopId, userId);
        const url = response.certificate_url;

        if (!url) throw new Error("Link do certificado não encontrado");

        const parsedUrl = new URL(url);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            throw new Error("Link do certificado inválido");
        }

        setCertificateUrl(url);
        setModalMessage("Certificado gerado com sucesso!\nClique em OK para abrir.");
        setModalType("success");
        } catch (err) {
        console.error("Erro ao emitir certificado:", err);
        setModalMessage(err instanceof Error ? err.message : "Erro ao emitir certificado");
        setModalType("error");
        } finally {
        setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        if (modalType === "success" && certificateUrl) {
        window.open(certificateUrl, "_blank");
        }
        setCertificateUrl(null);
    };

    return {
        certificados,
        loading,
        error,
        emitirCertificado,
        modalIsOpen,
        modalMessage,
        modalType,
        closeModal,
    };
    }
