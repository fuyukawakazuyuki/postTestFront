export default function Post({ params }: { params: { slug: number } }) {
    console.log(params);
    return <h1>My Page</h1>
  }