"use client";

import Image from "next/image";
import {auth} from "@clerk/nextjs/server";
import {useUser} from "@clerk/nextjs";
import {createUser} from "@/lib/actions/user.actions";

export default function UserInfoForm() {
    const { user } = useUser();
    // const [form] = Form.useForm();

    async function onFinish(values: {username: string} ) {
        if(user) {
            await createUser(values.username, user.id);
        }else {
            console.log("User is null");
        }
    }

    return (
        <div className="w-10 h-10 flex flex-col">
            {/*<Image*/}
            {/*    src={user?.imageUrl || ""}*/}
            {/*    alt="User Icon"*/}
            {/*    width={100}*/}
            {/*    height={100}*/}
            {/*    className="rounded-full object-cover"*/}
            {/*/>*/}
            {/*<Form*/}
            {/*    form={form}*/}
            {/*    onFinish={onFinish}*/}
            {/*    autoComplete="off"*/}
            {/*    initialValues={{ username: user?.username }}*/}
            {/*>*/}
            {/*    <Form.Item*/}
            {/*        label="Username"*/}
            {/*        name="username"*/}
            {/*        rules={[{ required: true, message: "Username is required" }]}*/}
            {/*    >*/}
            {/*        <Input />*/}
            {/*    </Form.Item>*/}

            {/*    <Form.Item>*/}
            {/*        <Button type="primary" htmlType="submit">*/}
            {/*            Submit*/}
            {/*        </Button>*/}
            {/*    </Form.Item>*/}
            {/*</Form>*/}

        </div>
    )
}