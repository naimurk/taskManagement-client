import React from 'react'
import ReactDOM from 'react-dom/client'

import Modal from 'react-modal';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './Layout/Main/Main.jsx';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ReactModal from 'react-modal';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
]);

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
