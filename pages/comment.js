import CreateCom from '../components/Commentcomponent';

const Comment = (props) => {
    return (
        <CreateCom postId={props.url.query.id} />
    )
}
export default Comment;