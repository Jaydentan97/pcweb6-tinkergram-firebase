import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

export default function PostPageDetails() {
    const params = useParams();
    const id = params.id;
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState(""); 
    const [condition, setCondition] = useState(""); 
    const [price, setPrice] = useState(""); 
    const [image, setImage] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    async function deletePost(id) { 
        await deleteDoc(doc(db, "posts", id));
        navigate("/");
    }

    function renderEditDelete() {
        const currentUserID = user.uid
        
        if (currentUserID === "XPyih2gHUudDPOCihHeTybRScN53") {
            return (
                <>
                    <Card.Link href={`/update/${id}`}>Edit</Card.Link>
                    <Card.Link
                        onClick={() => deletePost(id)}
                        style={{ cursor: "pointer" }}
                    >
                        Delete
                    </Card.Link>
                </>
            );
        } else {
            return null;
        }
    }
    
    
    
    async function getPost(id) {
        const postDocument = await getDoc(doc(db, "posts", id));
        const post = postDocument.data();
        setCaption(post.caption);
        setImage(post.image);
        setDescription(post.description);
        setCondition(post.condition);
        setPrice(post.price);
    }

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/login");
        getPost(id);
    }, [id, navigate, user, loading]);

    return (
        <>
            <Container>
                <Row style={{ marginTop: "2rem" }}>
                    <Col md="6">
                        <Image src={image} style={{ width: "100%" }} />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Text><strong>Caption:</strong> {caption}</Card.Text>
                                <Card.Text><strong>Description:</strong> {description}</Card.Text>
                                <Card.Text><strong>Condition:</strong> {condition}</Card.Text>
                                <Card.Text><strong>Price:</strong> {price}</Card.Text>
                                {renderEditDelete()}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
