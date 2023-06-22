import { PageHeader, PageHeaderProps } from "../../shared/page-header/PageHeader"
import { Card, CardContent, Typography } from "@mui/material";


export function Admin() {
    const pageHeaderProps: PageHeaderProps = {
        title: 'admin',
        subtitle: 'for admin eyes only...',
        color: 'pink'
    };

    const adminCard = (
        <Card variant="outlined" sx={{ minWidth: 450, maxWidth: 450, outlineColor: 'white', backgroundColor: 'palegoldenrod', color: 'black' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Admin Card
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    You can only view this page if you are an <b>admin</b>.
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

            {adminCard}
        </div>
    );
}
