/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// Helper component for Atom icon
import React from 'react';

const AtomIcon = ({className}: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="1"></circle>
    <path d="M14.644 3.37a10 10 0 1 0-5.288 0"></path>
    <path d="M19.835 11.71a10 10 0 0 0-15.67 0"></path>
    <path d="M12 20.642a10 10 0 0 0 0-7.284"></path>
  </svg>
);

export default AtomIcon;
