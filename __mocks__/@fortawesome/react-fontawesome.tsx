export const FontAwesomeIcon = ({className, icon, onClick}: {className: string | undefined, icon: any, onClick: () => void}) => {
    //console.log(icon.iconName);

    return(
        <span className={className + ' ' + icon.iconName} onClick={onClick} ></span> 
    )
}
