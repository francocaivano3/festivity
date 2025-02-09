import { useAlert } from "../context/alertContext";
const Alert = ({message, type}) => {
    const {alert} = useAlert();

    if(!alert.message) return null;

    return (
        <div className={`fixed top-5 right-5 px-4 py-3 rounded-md text-white ${type === "success" ? "bg-green-700" : "bg-red-700"}`}>
            {alert.message}
        </div>
    )
}

export default Alert;