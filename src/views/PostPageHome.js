import React, { useEffect, useState } from "react";
import { Container, Image, Nav, Navbar, Row, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function PostPageHome() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    async function getAllPosts() {
        const query = await getDocs(collection(db, "posts"));
        const posts = query.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setPosts(posts);
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    const ImagesRow = () => {
        return posts.map((post, index) => <ImageSquare key={index} post={post} />);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
       
    };

    return (
        <>
            <Navbar variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '0.5rem' }} />
                        RRRSell
                    </Navbar.Brand>
                    <Form className="d-flex mx-auto" style={{ width: '50%' }} onSubmit={handleSearchSubmit}>
                        <FormControl
                            type="search"
                            placeholder="Search for anything and everything"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{ width: 'calc(100% - 3rem)' }}
                        />
                        <Button type="submit" variant="success"><FontAwesomeIcon icon={faSearch} /></Button>
                    </Form>
                    <Nav>
                        <Link to="/add">
                            <Button style={{ backgroundColor: 'red', borderColor: 'red' }}>New Posting</Button>
                        </Link>
                        <Link to="/feedback">
                            <Button>Customer Feedback</Button>
                        </Link>
                        <Link to="/inbox">
                            <Button variant="link">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </Button>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="bg-custom text-black">
                <Row>
                    <ImagesRow />
                </Row>
            </Container>
        </>
    );
}

function ImageSquare({ post }) {
    const { image, id, caption, condition, price } = post;
    return (
        <Container 
          style={{
          width: "12rem",
          marginLeft: "1rem",
          marginTop: "0rem",
      }}>
            <Link
                to={`post/${id}`}
                style={{
                    width: "12rem",
                    marginLeft: "1rem",
                    marginTop: "0rem",
                }}
            >
                <Image
                    src={image}
                    style={{
                        objectFit: "cover",
                        width: "10rem",
                        height: "10rem",
                        marginLeft: "-1rem",
                    }}
                />
            </Link>
            <div>
                <p style={{ fontSize: '0.8rem', margin: '0.2rem 0' }}>{caption}</p> 
                <p style={{ fontSize: '0.8rem', margin: '0.2rem 0' }}>Condition: {condition}</p> 
                <p style={{ fontSize: '0.8rem', margin: '0.2rem 0' }}>Price: {price}</p> 
            </div>
        </Container>
    );
}
