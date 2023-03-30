
export default function Die(props) {
    const styles ={
        backgroundColor: props.isHeld ? "#c8fadc" : "white",
        border: props.isHeld ? "1px solid #38d176":"1px solid grey",
        transform: props.isHeld ? "scale(1.2)" :"scale(1)"
    }
    
    return (
        <div className="die-face" onClick={props.holdDice} style={styles}>
            <img className="die-img" src={props.value}/>
        </div>
    )
}
