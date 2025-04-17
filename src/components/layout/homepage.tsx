'use client'

import { CrownOutlined } from "@ant-design/icons"
import { Result } from "antd"
import { redirect } from "next/navigation";

const HomePage = () => {
    return (
        redirect("/auth/login")
    )
}

export default HomePage;

