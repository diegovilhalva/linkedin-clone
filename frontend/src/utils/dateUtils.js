import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (dateString) => {
	const date = parseISO(dateString);
	return isValid(date) ? format(date, "MMM yyyy", { locale: ptBR }) : "Até o momento";
};
