import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostPageUpdate() {
    const params = useParams();
    const id = params.id;
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState(""); 
    const [condition, setCondition] = useState(""); 
    const [price, setPrice] = useState(""); 
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("https://zca.sg/img/placeholder");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    async function updatePost() {
        const imageReference = ref(storage, `images/${image.name}`);
        const response = await uploadBytes(imageReference, image);
        const imageUrl = await getDownloadURL(response.ref);
        await updateDoc(doc(db, "posts", id), { caption, description, condition, price, image: imageUrl });
        navigate("/");
    }

    async function getPost(id) {
        const postDocument = await getDoc(doc(db, "posts", id));
        const post = postDocument.data();
        setCaption(post.caption);
        setDescription(post.description);
        setCondition(post.condition);
        setPrice(post.price);
        setImage(post.image);
    }

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/login");
        getPost(id);
    }, [id, loading, navigate, user]);

    return (
        <div>
            <Navbar variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="/">RRRSell</Navbar.Brand>
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
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Add a description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="condition">
                        <Form.Label>Condition</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Add a condition..."
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Add a price..."
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                        <Image
                            src={previewImage}
                            style={{
                                objectFit: "cover",
                                width: "10rem",
                                height: "10rem",
                            }}
                        />
                        <Form.Label>Image File</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => {
                                const imageFile = e.target.files[0];
                                const previewImage = URL.createObjectURL(imageFile);
                                setImage(imageFile);
                                setPreviewImage(previewImage);
                            }}
                        />
                        <Form.Text className="text-muted">
                            Make sure the file has an image type at the end: jpg, jpeg, png.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={updatePost}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
