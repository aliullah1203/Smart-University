import React from "react";

export default function StudentProfile({ student }) {
  if (!student) return null;
  return (
    <div style={{ padding: 12 }}>
      <h3>{student.name}</h3>
      <p>
        <strong>ID:</strong> {student.id}
      </p>
      <p>
        <strong>Enrollment:</strong> {student.enrollment_no}
      </p>
    </div>
  );
}
