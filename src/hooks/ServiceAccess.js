import { useState, useEffect } from "react";
import axios from "axios";

export function useServiceAccess(studentId, serviceId) {
  const [hasAccess, setHasAccess] = useState(null); // null = loading, true/false = result
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId || !serviceId) return;
    setHasAccess(null);
    setError(null);

    axios
      .get(`http://localhost:4149/api/services/${studentId}`)
      .then((res) => {
        const found = res.data.some(
          (service) =>
            service.service_id === serviceId && service.service_available === "Y"
        );
        setHasAccess(found);
      })
      .catch(() => {
        setError("Failed to fetch student services.");
        setHasAccess(false);
      });
  }, [studentId, serviceId]);

  return { hasAccess, error };
}