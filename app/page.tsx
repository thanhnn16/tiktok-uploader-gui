'use client';

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input, Select, SelectItem, Listbox, ListboxItem } from "@nextui-org/react";
import { invoke } from '@tauri-apps/api/core';
import { BaseDirectory, resolveResource } from '@tauri-apps/api/path';

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [dirPath, setDirPath] = useState('');
  const [dirItems, setDirItems] = useState<string[] | null>(null);
  const [fsError, setFsError] = useState<string | null>(null);

  const browsers = [
    { label: "Chrome", value: "chrome" },
    { label: "Firefox", value: "firefox" },
    { label: "Edge", value: "edge" },
    { label: "Safari", value: "safari" },
  ];

  const callGreet = async () => {
    try {
      const result = await invoke<string>('greet', { name: 'Next.js' });
      setGreeting(result);
    } catch (error) {
      console.error("Error invoking greet command:", error);
      setGreeting('Failed to get greeting.');
    }
  };

  const callListDir = async () => {
    setDirItems(null);
    setFsError(null);
    try {
      const resourcePath = await resolveResource('');
      const pathToList = dirPath || resourcePath;

      console.log(`Attempting to list directory: ${pathToList}`);
      const result = await invoke<string[]>('list_dir_items', { path: pathToList });
      setDirItems(result);
    } catch (error: any) {
      console.error("Error invoking list_dir_items command:", error);
      setFsError(error.toString() || 'Failed to list directory items.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Card className="max-w-[400px] w-full">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">NextUI Component Examples</p>
            <p className="text-small text-default-500">Button, Input, Select</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody className="gap-4">
          <Input label="Example Input" placeholder="Enter some text" />
          <Select
            label="Select Browser"
            placeholder="Choose a browser"
            defaultSelectedKeys={["chrome"]}
            className="max-w-xs"
          >
            {browsers.map((browser) => (
              <SelectItem key={browser.value} value={browser.value}>
                {browser.label}
              </SelectItem>
            ))}
          </Select>
        </CardBody>
        <Divider/>
        <CardFooter className="gap-2">
          <Button color="primary">Example Button</Button>
          <Button color="secondary" onClick={callGreet}>Call Rust Greet</Button>
        </CardFooter>
      </Card>
      {greeting && <p className="mt-4 text-center">{greeting}</p>}
      <Card className="max-w-[400px] w-full">
        <CardHeader>
          <p className="text-md">File System Test</p>
        </CardHeader>
        <Divider />
        <CardBody className="gap-4">
          <Input
            label="Directory Path (Optional)"
            placeholder="Default: App Resource Dir"
            value={dirPath}
            onValueChange={setDirPath}
          />
          <Button onClick={callListDir}>List Directory Items</Button>
          {fsError && (
            <p className="text-danger text-small">Error: {fsError}</p>
          )}
          {dirItems && (
            <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-2">
              <p className="text-small text-default-500 mb-1 px-1">Directory Items:</p>
              <Listbox
                aria-label="Directory Items"
                variant="flat"
                className="max-h-[200px] overflow-y-auto"
              >
                {dirItems.length > 0 ? (
                  dirItems.map((item) => (
                    <ListboxItem key={item}>{item}</ListboxItem>
                  ))
                ) : (
                  <ListboxItem key="empty">(Directory is empty)</ListboxItem>
                )}
              </Listbox>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
