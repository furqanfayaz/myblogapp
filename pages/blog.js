import Bl from '../components/Blogcomponent';

const Blog = (props) => {
    return (
        <Bl blogId={props.url.query.id} />
    )
}
export default Blog;