import React, { useEffect, useState } from "react";
import { Container, Table, Button, Alert, Spinner } from "react-bootstrap";
import { getPendingUsers, approveUser } from "../../api/admin";

export default function PendingRequests() {
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    getPendingUsers()
      .then(setPending)
      .catch((e) => setError(e.message));
  }, []);

  const handleApprove = async (id) => {
    setApprovingId(id);
    try {
      await approveUser(id);
      setPending((p) => p.filter((u) => u._id !== id));
    } catch (e) {
      setError(e.message);
    } finally {
      setApprovingId(null);
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (pending === null)
    return <Spinner animation="border" className="m-4" />;

  return (
    <Container className="mt-4">
      <h2>Pending Sign-Ups</h2>
      {pending.length === 0 ? (
        <Alert variant="info">No pending requests.</Alert>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <Button
                    size="sm"
                    disabled={approvingId === u._id}
                    onClick={() => handleApprove(u._id)}
                  >
                    {approvingId === u._id ? "…" : "Approve"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
