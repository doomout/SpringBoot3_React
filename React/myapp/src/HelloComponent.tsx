import { HelloProps } from "./types";

function HelloComponent({name, age}: HelloProps) {
    return (
        <>
        안녕 나는 {name}인데, 난 {age} 살이야.
        </>
    );
}

export default HelloComponent;