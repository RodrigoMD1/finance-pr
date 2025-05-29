import { useEffect, useState } from "react";

export const BitcoinPrice = () => {
    const [price, setPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchPrice = () => {
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
                .then(res => res.json())
                .then(data => setPrice(data.bitcoin.usd));
        };

        fetchPrice(); // Llama al cargar
        const interval = setInterval(fetchPrice, 30000); // Actualiza cada 30 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, []);

    return (
        <div className="my-4 text-center">
            <span className="font-bold">Precio actual de Bitcoin:</span>{" "}
            {price !== null
                ? `$${price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`
                : "Cargando..."}
        </div>
    );
};