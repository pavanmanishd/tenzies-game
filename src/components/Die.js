export default function Die(props){
    return(
        <div className={`die ${ props.isHeld ? "held" : "" }`} onClick={props.handleClick} >
            <h2>{props.value}</h2>
        </div>
    )
}