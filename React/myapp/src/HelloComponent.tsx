type HelloPorps = {
    name: string;
    age: number;
};
function HelloComponent({name, age}: HelloPorps) {
    return (
        <>
        안녕 나는 {name}인데, 난 {age} 살이야.
        </>
    );
}

export default HelloComponent;