function DownloadReportButton() {
    const handleDownload = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("https://proyecto-inversiones.onrender.com/api/report/download", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const text = await res.text();
        const blob = new Blob([text], { type: "text/html" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "reporte.html";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <button className="mt-4 btn btn-primary" onClick={handleDownload}>
            Descargar reporte manualmente
        </button>
    );
}

export function Reports() {
    return (
        <div className="max-w-md p-4 mx-auto mt-8 border rounded">
            <h2 className="mb-4 text-xl font-bold">Informes de tu Portfolio</h2>
            <DownloadReportButton />
        </div>
    );
}