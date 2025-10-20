export default function Spinner() {
    return (
        <div className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
            <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
