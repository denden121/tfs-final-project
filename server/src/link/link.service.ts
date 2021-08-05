import {Link} from "./link.entity";
import {generateNewLink} from "../helpers/link.helper";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";

const defaultLinks = [
    'https://www.comss.ru/download/page.php?id=1410',
    'https://github.com/w3tecch/typeorm-seeding#-introduction',
    'http://www.winblog.ru/quicktip/1147769703-28111401.html',
    'http://www.pc-problems.ru/win_xp/secrets_of_work/140/',
    'https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-tcp-or-udp-port-on-windows',
    'https://www.comss.ru/download/page.php?id=1410',
    'https://github.com/w3tecch/typeorm-seeding#-introduction',
    'http://www.winblog.ru/quicktip/1147769703-28111401.html',
    'http://www.pc-problems.ru/win_xp/secrets_of_work/140/',
    'https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-tcp-or-udp-port-on-windows',
    'https://www.comss.ru/download/page.php?id=1410',
    'https://github.com/w3tecch/typeorm-seeding#-introduction',
    'http://www.winblog.ru/quicktip/1147769703-28111401.html',
    'http://www.pc-problems.ru/win_xp/secrets_of_work/140/',
    'https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-tcp-or-udp-port-on-windows'
]

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(Link)
        private linkRepository: Repository<Link>,
    ) {
        defaultLinks.map((link)=> this.create({link: link}, Math.round(Math.random() * 100)))
    }

    async  findAll(): Promise<Link[]> {
        return await this.linkRepository.find();
    }

    async  create(link: {link: string}, count = 0): Promise<Link> {
        const genLink = await this.getGenLink()
        const newLink = {
            count: count,
            link: link.link,
            generateLink: genLink
        }

        return await this.linkRepository.save(newLink);
    }

    async getGenLink() {
        const generateLink = generateNewLink()

        const check = await this.linkRepository.findOne({where : {generateLink: generateLink}});
        if(check) {
           return this.getGenLink()
        }
        return generateLink;
    }

    async getByGenerateLink(generateLink: string) {
        return await this.linkRepository.findOne({where : {generateLink: generateLink}});
    }

    async update(link: Link): Promise<UpdateResult> {
        link.count += 1;
        return await this.linkRepository.update(link.id, link);
    }
}
