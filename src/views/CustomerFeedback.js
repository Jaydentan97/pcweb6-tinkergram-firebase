import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function CustomerFeedback() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === "" || description.trim() === "") return;

        try {
            await addDoc(collection(db, "feedback"), {
                name,
                description,
                timestamp: serverTimestamp(),
            });

            setName("");
            setDescription("");
        } catch (error) {
            console.error("Error adding feedback: ", error);
        }
    };

    return (
        <Container>
            <h1>Customer Feedback</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Write your feedback here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit Feedback
                </Button>
            </Form>
        </Container>
    );
}
