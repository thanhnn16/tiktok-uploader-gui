'use client';

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { invoke } from '@tauri-apps/api/core';

export default function Home() {
  const [greeting, setGreeting] = useState('');

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
    </div>
  );
}
