export default function CreatePage() {
return (
<main style={{
display: "flex",
flexDirection: "column",
alignItems: "center",
marginTop: "100px",
fontFamily: "Arial"
}}>
<h1>Create a Post</h1>
<textarea
placeholder="Write something..."
style={{
width: "300px",
height: "100px",
marginTop: "20px"
}}
/>
<button style={{
marginTop: "20px",
padding: "10px 20px",
cursor: "pointer"
}}>
Post
</button>
</main>
);
}