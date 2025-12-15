"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Copy, X, Trash } from "lucide-react";

const SERVER_NAME = process.env.NEXT_PUBLIC_SERVER_URL;

interface ApiKeyFormProps {
  projectId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeyForm({
  projectId,
  isOpen,
  onClose,
}: ApiKeyFormProps) {
  const [message, setMessage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen || !projectId) return;

    const fetchApiKey = async () => {
      try {
        const res = await axios.get(`${SERVER_NAME}/keys/get_key`, {
          params: { project_id: projectId },
          withCredentials: true,
        });

        console.log("API Key Fetch Response :", res.data);

        setApiKey(res.data.api_key || "");
      } catch {
        setApiKey("");
      }
      finally {

        setTimeout(() => setMessage(""), 2000);
       }
    };

    fetchApiKey();
  }, [projectId, isOpen]);

  const handleCopy = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const createAPIKey = async () => {
    if (!projectId) return;

    try {
      const res = await axios.post(
        `${SERVER_NAME}/keys/generate_key`,
        { project_id: projectId },
        { withCredentials: true }
      );
      console.log("API Key Generation Response :", res.data);
      setApiKey(res.data.api_key);
      setMessage("API Key generated successfully");
    } catch (er) {
      if (axios.isAxiosError(er)) {
        setMessage(er.response?.data?.message || "Error generating API Key");
      } else {
        setMessage("Unexpected error occurred");
      }
    }
    finally{
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const deleteAPI = async () => {
    if (!projectId) return;

    try {
      const response = await axios.delete(`${SERVER_NAME}/keys/delete_key`, {
        data: { project_id: projectId },
        withCredentials: true,
      });
    
      if(response.status === 200) {
          setApiKey("");
        setMessage(response.data.message);
      }
      else{
        setMessage("Error deleting API Key");
      }
    
    } catch(er) {
      if (axios.isAxiosError(er)) {
        setMessage(er.response?.data?.message || "Error generating API Key");
      } else {
        setMessage("Unexpected error occurred");
      }
    }

    finally{
      setTimeout(() => setMessage(""), 2000);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="flex min-h-screen font-roboto items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 fixed inset-0 bg-black/40 z-50 overflow-auto">      <div className="w-full max-w-lg p-10 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">

      {/* Header */}
      <div className="flex justify-between mb-6 text-white text-xl">
        <h1>API Key Management</h1>
        <button title="Close" onClick={onClose} className="bg-red-500 p-2 rounded-full hover:bg-red-600">
          <X />
        </button>
      </div>

      {apiKey && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label htmlFor="apiKey" className="text-white">API Key</label>
            <input
              id="apiKey"
              value={apiKey}
              readOnly
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg"
            />
          </div>
          <button title="Copy API Key" onClick={handleCopy} className="bg-gray-300 p-2 rounded-md">
            <Copy size={16} />
          </button>
        </div>
      )}

      {copied && <p className="text-green-400 mt-2">Copied!</p>}

      <div className="flex gap-2 mt-6">
        <button onClick={createAPIKey} className="flex-1 bg-blue-600 py-2 rounded-xl text-white">
          Generate API Key
        </button>

        <button title="delete" onClick={deleteAPI} className="bg-red-500 p-2 rounded-md">
          <Trash color="white" />
        </button>
      </div>

      {message && <p className="mt-4 text-center text-red-400">{message}</p>}
    </div>
    </div>
  );
}
