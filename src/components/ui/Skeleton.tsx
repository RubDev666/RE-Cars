export default function Skeleton({type}: {type: string}) {
    return(
        <div className={`skeleton ${'skeleton-' + type}`}></div>
    )
}
