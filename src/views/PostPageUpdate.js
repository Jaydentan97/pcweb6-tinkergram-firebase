import React, { useEffect, useState } from "react";
import { Button, Container, Form,Image, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate, useParams} from "react-router-dom";
import {auth,db,storage} from "../firebase";
import {doc,getDoc,updateDoc} from "firebase/firestore";
import {signOut} from "firebase/auth";
import {getDownloadURL,ref,uploadBytes} from "firebase/storage";


export default function PostPageUpdate() {
  const params = useParams();
  const id = params.id;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [previewImage,setPreviewImage]=useState("https://zca.sg/img/placeholder");
  const [user,loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function updatePost() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference,image);
    const imageUr1 = await getDownloadURL(response.ref);
    await updateDoc(doc(db,"posts",id),{caption,image:imageUr1});
    navigate ("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db,"posts",id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  },
  [id, loading, navigate, user]);


  return (
    <div>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link href="/add">🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Update Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
          <Image src={previewImage} style={{
                        objectFit: "cover",
                        width: "10rem",
                        height: "10rem"
                    }}
                    />
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="file"
              placeholder="https://zca.sg/img/1"
              // value={image}
              onChange={(e) => {
                //setImage(e.target.files[0]);
                const imageFile = e.target.files[0];
                const previewImage = URL.createObjectURL(imageFile);
                setImage(imageFile);
                setPreviewImage(previewImage);
            }}
            />
            <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={(e) => updatePost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
