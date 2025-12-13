import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Single: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <FileUpload
        label="Upload a file"
        files={files}
        onFilesSelected={setFiles}
        accept=".pdf,image/*"
        helperText="PDF or images allowed."
      />
    );
  },
};

export const MultipleWithMaxSize: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <FileUpload
        label="Upload files"
        files={files}
        onFilesSelected={setFiles}
        multiple
        maxSize={1024 * 1024} // 1MB
        helperText="Max 1MB per file."
      />
    );
  },
};

export const WithUploadHandler: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <FileUpload
        label="Upload with handler"
        files={files}
        onFilesSelected={setFiles}
        onUpload={async () => {
          await new Promise((r) => setTimeout(r, 800));
        }}
        multiple
      />
    );
  },
};


