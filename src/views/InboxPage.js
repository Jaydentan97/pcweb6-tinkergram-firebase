import React, { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function InboxPage() {
    const [messages, setMessages] = useState([
        { id: 1, sender: "Johnny", body: "Able to nego price for the Nikon camera?" },
        { id: 2, sender: "Yann Loh", body: "Hello, I am interested in the HuaWei Mate 20. Can you provide more details?" },
        { id: 3, sender: "M&M Chua", body: "Hi interested in your bicycle, can nego abit?" }
    ]);

    return (
        <Container>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                <FontAwesomeIcon icon={faHome} size="2x" style={{ margin: '1rem 0' }} />
            </Link>
            <h1>Inbox</h1>
            <ListGroup>
                {messages.map((message, index) => (
                    <ListGroup.Item key={index}>
                        <Row>
                            <Col md={2}><strong>From:</strong> {message.sender}</Col>
                            <Col md={7}><strong>Message:</strong> {message.body}</Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}
