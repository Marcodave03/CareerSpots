// EditJob.tsx
import '../../../Style/interviewpage.css';

type InterviewProps =
{
        interview_link: string | undefined,
        interview_name: string | undefined
}

const EditJob = (props: InterviewProps) => {
    return (
        <div className="interviewvideo container mt-5">
            <iframe width="100%" height="600"
                src={props.interview_link}>
            </iframe>
            <h1>{props.interview_name}</h1>
        </div>
    );
};

export default EditJob;
