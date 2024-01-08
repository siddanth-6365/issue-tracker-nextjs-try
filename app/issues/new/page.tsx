/* eslint-disable react-hooks/rules-of-hooks */
"use client"; // since input boxs cant render in server,so use client
import React, { useState } from 'react'
import { TextField, Button, Callout, Text } from "@radix-ui/themes"
import axios from 'axios';
import { useRouter } from 'next/navigation'; // router to navigate through routes
import SimpleMDE from "react-simplemde-editor"; // an markdown editor for description
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form" // for form vaidation
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from "../../zodValidationSchemas"
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>; // convert the schema to interface

const page = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });// IssueForm is the type(schema) we used for the form
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState('');
    const { errors } = formState;

    return (
        <>
            <div className="max-w-xl">
                {error && (
                    <Callout.Root color="red" className='mb-5'>
                        <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>
                )}
                <form
                    className=' space-y-3'
                    onSubmit={handleSubmit(async (data) => {
                        try {
                            await axios.post('/api/issue', data);
                            router.push('/issues');
                        } catch (error) {
                            // console.log(error.response.data); 
                            // this error are from server where we are doing the zod validation and if any error then passing an response, in response we get each attributes error
                            setError('An unexpected error occurred.');

                        }
                    })}>
                    <TextField.Root>
                        <TextField.Input placeholder="Title" {...register('title')} />
                    </TextField.Root>
                    {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <SimpleMDE placeholder="Description" {...field} />
                        )}
                    />
                    {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
                    <Button>Submit New Issue</Button>
                </form>
            </div>
        </>
    )
}

export default page;
// need to use Controller(from react-hook-form) here for validation of description, but for title validation simple add register
// In summary, you are passing the form data type (IssueForm) and the Zod schema (createIssueSchema) to useForm so that the hook can use this information for validation and to generate the necessary form methods (register, control, handleSubmit, etc.)
// formState is an object that likely contains various properties related to the state of the form. It could include information such as whether the form is dirty, touched, submitted, etc.