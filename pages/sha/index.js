import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Row, Col, InputGroup, Form, Container, Label } from 'react-bootstrap';
import styles from "./sha.module.css";

export default function SHA() {
  const [textUppercase, setTextUppercase] = useState(false);
  const [text, setText] = useState("");
  const [prefixEnabled, setPrefixEnabled] = useState(true);
  const [prefixUppercase, setPrefixUppercase] = useState(true);
  const [prefixLength, setPrefixLength] = useState(9);
  const [prefix, setPrefix] = useState("");
  const [hashResult, setHashResult] = useState("");
  const [prefixHash, setPrefixHash] = useState("");
  const [prefixHashed, setPrefixHashed] = useState(false);
  const [textHash, setTextHash] = useState("");
  const [textLength, setTextLength] = useState(9);
  const [copied, setCopied] = useState(false);

  const chainFilter = (hash, { uppercase, length }) => {
    hash = uppercase ? hash.toUpperCase() : hash;
    hash = hash.substr(0, length);
    return hash;
  }

  const sha256 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);                    
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const hashText = async () => {
    if (text === "") {
      setTextHash("");
    } else {
      const hash = await sha256(text);
      setTextHash(chainFilter(hash, { uppercase: textUppercase, length: textLength }));
    }
  };
  
  const hashPrefix = async () => {
    if (prefix === "" || !prefixEnabled) {
      setPrefixHash("");
    } else {
      if (prefixHashed) {
        const hash = await sha256(prefix);
        setPrefixHash(chainFilter(hash, { uppercase: prefixUppercase, length: prefixLength }));
      } else {
        setPrefixHash(prefix);
      }
    }
  };

  const calculateHashResult = () => {
    if (textHash === "" && prefixHash === "")
      setHashResult("");
    else
      setHashResult(prefixHash + textHash);
  };

  useEffect(() => {
    calculateHashResult();
  }, [prefixHash, textHash]);

  useEffect(() => {
    hashText();
    calculateHashResult();
  }, [text, textUppercase, textLength]);

  useEffect(() => {
    hashPrefix();
    calculateHashResult();
  }, [prefix, prefixEnabled, prefixUppercase, prefixLength, prefixHashed]);

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(hashResult);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }


  return (
  <Container className={`mt-4`}>
    <Row>
      <Col sm={12}>
        <Form.Check
          type="checkbox"
          label="Uppercase"
          checked={prefixUppercase}
          onChange={() => setPrefixUppercase(!prefixUppercase)}
        />
        <Form.Check
          type="checkbox"
          label="Hash"
          checked={prefixHashed}
          onChange={() => setPrefixHashed(!prefixHashed)}
        />
        <Form.Label htmlFor="prefix-length">Length</Form.Label>
        <Row>
          <Col sm={3}>
            <InputGroup className="mb-3">
              <Form.Control type="number" id="prefix-length" placeholder="Length" onChange={(e) => setPrefixLength(e.target.value)} value={prefixLength} />
            </InputGroup>
          </Col>
        </Row>
        <Form.Label htmlFor="prefix">Prefix</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox onChange={() => setPrefixEnabled(!prefixEnabled)} checked={prefixEnabled} />
          <Form.Control id="prefix" placeholder="Prefix" onChange={(e) => setPrefix(e.target.value)} value={prefix} />
        </InputGroup>
      </Col>
      <Col sm={12}>
        <Form.Check
          type="checkbox"
          label="Uppercase"
          checked={textUppercase}
          onChange={() => setTextUppercase(!textUppercase)}
        />
        <Form.Label htmlFor="text-length">Length</Form.Label>
        <Row>
          <Col sm={3}>
          <InputGroup className="mb-3">
            <Form.Control type="number" id="text-length" placeholder="Length" onChange={(e) => setTextLength(e.target.value)} value={textLength} />
          </InputGroup>
          </Col>
        </Row>
        <Form.Label htmlFor="text">Text</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control id="text" placeholder="Text to hash" onChange={(e) => setText(e.target.value)} value={text} />
        </InputGroup>
      </Col>
    </Row>
    <div className={`${styles.shaResultContainer} shadow p-3 mb-5 bg-white rounded p-2`}>
      {prefixHash !== "" &&
        <div><span>Prefix:</span> {prefixHash}</div>
      }
      {textHash !== "" &&
        <div><span>Text hash:</span> {textHash}</div>
      }
      {hashResult !== "" &&
        <div><span>Result hash</span> {hashResult}</div>
      }
    </div>
    <Button className='w-100' onClick={onCopyToClipboard}>{copied ? "Copied!" : "Copy to clipboard"}</Button>
  </Container>);
}
