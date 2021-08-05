import {LinkService} from "./link.service";
import {Link} from "./link.entity";
import {checkLink} from "../helpers/link.helper";
import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res} from "@nestjs/common";
import {count} from "rxjs/operators";

@Controller('link')
export class LinkController {
    constructor(private linkService: LinkService){}

    @Get()
    async index(): Promise<Link[]> {
        const links = await this.linkService.findAll();
        return links?.sort((a, b) =>  b.count - a.count).slice(0,10);
    }

    @Get(':generateLink')
    async getLink(
        @Param('generateLink') generateLink: string,
        @Res() res
    ) {
        const link = await this.linkService.getByGenerateLink(generateLink);
        if (link) {
            await this.linkService.update(link)
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
            res.header('Cache-Control', 'max-age=0, public, s-max-age=900');
            res.header('Referrer-Policy', 'unsafe-url');

            return res.status(302).redirect(`${link.link}`);
        }

        return res.status(404).send('Not found')
    }

    @Post()
    createAsync(@Body() linkData: { link: string }) {
        if ( !linkData?.link || !checkLink(linkData.link)){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Incorrect format url'},
                HttpStatus.BAD_REQUEST);
        }

        return this.linkService.create(linkData);
    }
}
