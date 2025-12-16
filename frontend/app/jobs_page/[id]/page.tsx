"use client"
import { JobsCard } from "@/app/components/cards/jobs_card"



interface JobsCardProps {
    queueId:string,
    name: string,
    status:string,
    attempts:number,
    failedReason:string
}
export default function JobsPage() {

    return (
        <div>
  <JobsCard
    queueId="queue_123"
    name="email1"
    status="completed"
    attempts={1}
  />
</div>

    )


}
