import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WelcomeScreen = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-2xl m-auto">
        <CardContent>
          <CardHeader>
            <CardTitle>
              <div className="welcome-img flex justify-center items-center py-10">
                <Image
                  src="/LoginScreen.png"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <div className="action-btns flex items-center justify-center gap-2 flex-col">
            <Link href="auth/LoginAdmin" className="w-full">
              <Button variant="hover-blue-full">Login as Admin</Button>
            </Link>
            <Button variant="outline" className="w-full">
              Login as Operator
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
