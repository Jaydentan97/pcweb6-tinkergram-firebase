import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostPageAdd() {
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState(""); 
    const [image, setImage] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState("https://zca.sg/img/placeholder");

    async function addPost() {
        const imageReference = ref(storage, `images/${image.name}`);
        const response = await uploadBytes(imageReference, image);
        const imageUrl = await getDownloadURL(response.ref);
        await addDoc(collection(db, "posts"), { caption, description, condition, price, image: imageUrl });

        navigate("/");
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
    }, [loading, user, navigate]);

    return (
        <>
            <Container>
                <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
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

                    <Image src={previewImage} style={{
                        objectFit: "cover",
                        width: "10rem",
                        height: "10rem"
                    }}
                    />

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Local Image File</Form.Label>
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
                            Make sure the url has an image type at the end: jpg, jpeg, png.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" onClick={addPost}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}
