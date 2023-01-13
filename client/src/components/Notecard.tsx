import { Badge, Card, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"

const Notecard = () => {
    return (
        <Card as={Link} to={'/123'} className={'h-100 text-reset text-decoration-none'}>
            <Card.Body>
                <Stack gap={2} className='align-items-center justify-content-center h-100'>
                    <span className="my-2 fs-3 w-75">Test asda asdzxc  sada asd</span>
                    <Stack gap={1} direction='horizontal' className='justify-content-center align-items-center flex-wrap'>
                        <Badge className='text-truncate fs-6'>New</Badge>
                        <Badge>Test</Badge>
                    </Stack>
                </Stack>
            </Card.Body>
        </Card>
    )

}

export default Notecard