import { PageHeader, PageHeaderProps } from "../../shared/page-header/PageHeader"
import { Card, CardContent, Typography } from "@mui/material";


export function Authenticated() {
    const pageHeaderProps: PageHeaderProps = {
        title: 'authenticated',
        subtitle: 'must be authenticated to see this page...',
        color: 'pink'
    };

    const authCard = (
        <Card variant="outlined" sx={{ minWidth: 450, maxWidth: 450, outlineColor: 'white', backgroundColor: 'peachpuff', color: 'black' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Authenticated Card
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    You can only view this page if you have been <b>authenticated</b>.
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro consequatur eos, expedita dolor inventore veniam aliquam omnis suscipit voluptatibus reprehenderit dicta quod impedit sequi distinctio! Deserunt dicta quae inventore? Debitis?
                </Typography>
            </CardContent>
        </Card>
    )

    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            {authCard}
        </div>
    );
}
