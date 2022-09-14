import Link from "next/link"

export default function Timeline ({userName}){
    return (
    <div>
        <h1>This is the timeline of {userName}</h1>
        <Link href='/'>Go Home</Link>
    </div>
    )
    
    
}

Timeline.getInitialProps = () => {
return {
    userName:"Abel"
}
}