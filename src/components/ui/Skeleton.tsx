export default function Skeleton({type}: {type: string}) {
    return(
        <div className={`skeleton ${'skeleton-' + type}`} role="status"></div>
    )
}
