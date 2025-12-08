export function gerarLinkWhats(telefone: string, nomeServico?: string) {
  const numeroLimpo = telefone.replace(/\D/g, "");

  if (numeroLimpo.length < 10) {
    throw new Error("Telefone inválido. Formato correto: DDD + número (ex: 51999999999).");
  }

  const mensagem = nomeServico
    ? `Olá! Tenho interesse no serviço: ${nomeServico}`
    : "Olá! Gostaria de conversar.";

  return `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
}
