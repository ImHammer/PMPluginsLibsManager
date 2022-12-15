import { LogPrint } from "../../../wailsjs/runtime/runtime";
import Notification from "./Notification";
import { Container } from "./styles";

export default function Notifications({ notifications, setnotify }) {

    function closeNotify(index) {
        setnotify(() => notifications.filter((value, ind) => {
            // LogPrint("olha: " + notifyTitle + ";" + notifyBody);
            if (index === ind) {
                return false;
            }
            return true;
        }));
    }

    const notifyElements = [];
    if (notifications !== undefined) {
        // for (let notify of notifications) {
            
        // }
        notifications.map((notify, index) => {
            notifyElements.push(
                <Notification
                    key={index}
                    title={notify.title ?? "NOTIFICAÇÃO"}
                    body={notify.message ?? "SEM CORPO"}
                    type={notify.type  ?? "danger"}
                    onCloseNotify={() => closeNotify(index)}
                />
            )
        })
    }

    return (
        <Container>
            { notifyElements }
        </Container>
    );
}