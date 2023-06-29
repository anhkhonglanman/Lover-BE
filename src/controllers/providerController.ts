import {Request, Response} from "express";
import providerService from "../service/ProviderService";
import userService from "../service/userService";
import imageService from "../service/imageService";
import { Provider } from "src/entity/Provider";
import ServiceProviderService from "../service/ServiceProviderService";
const jwt = require('jsonwebtoken')

class ProviderController {
    save = async (req: Request, res: Response) => {
           let token = req.headers.authorization.split(' ')[1];
           const decodedToken = jwt.decode(token);
           let provider = req.body
            let newProvider = await providerService.save(provider, decodedToken.idUser) 
            let image = provider.image
            let service = provider.service
            try {
           let newImage= await imageService.addImage(newProvider.id,image)
           let newSerrvice= await ServiceProviderService.addService(newProvider.id,service)

            res.status(200).json({
                success: true,
                data: newProvider
            })
        } catch (e) {
            res.status(400).json({
                success: false,
                message: 'tao provider ko thanh cong'
            })
        }
    }


    all = async (req: Request, res: Response) => {
        try {
            const { page, take, keyword, sex, name, city, country } = req.query;
            const query = {
                page: parseInt(String(page), 10) || 1,
                take: parseInt(String(take), 10) || 15,
                keyword: keyword || '',
                sex: sex || '',
                name: name || '',
                city: city || '',
                country: country || ''
            };

            const allProvider = await providerService.all(query);
            res.status(200).json({
                data: allProvider
            });
        } catch (e) {
            res.status(500).json({
                message: 'Có lỗi hệ thống cmnr'
            });
        }
    }

    showOne = async (req: Request, res: Response) => {
        let id = req.params.id
        let oneProvider = await providerService.one(id)
        res.status(200).json(oneProvider)
    }
    showOneByIdUser = async (req: Request, res: Response) => {
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        let id = decodedToken.idUser
        let oneProvider = await providerService.oneByIdUser(id)
        res.status(200).json(oneProvider)
    }
    acceptUser = async (req: Request, res: Response) => {
        let id  = req.params.id
        const data = await providerService.accept(id)
        res.status(200).json({
            message: true,
            data: data
        })
    }
    rejectUser = async (req: Request, res: Response) => {
        let id  = req.params.id
        const data = await providerService.reject(id)
        res.status(200).json({
            message: true,
            data: data
        })
    }
    editProvider = async (req: Request, res: Response) => {
        let provider = req.body;
        let id = req.params.id;
        let newProvider = await providerService.update(id, provider)
        res.status(200).json({
            success: true,
            data: newProvider
        })
    }
    privateProvider = async (req: Request, res: Response) => {
        let providerId = req.params.id
        let isPrivate = await providerService.private(providerId)
        res.status(200).json({
            message: 'chưa sẵn sàng',
            data: isPrivate
        })
    }
    publicProvider = async (req: Request, res: Response) => {
        let providerId = req.params.id
        let isPublic = await providerService.public(providerId)
        res.status(200).json({
            message: 'đang sẵn sàng',
            data: isPublic
        })
    }
    forRentProvider = async (req: Request, res: Response) => {
        let providerId = req.params.id
        let isPublic = await providerService.forRent(providerId)
        res.status(200).json({
            message: 'đang cho thuê',
            data: isPublic
        })
    }
    increaseCounts=async (req: Request, res: Response)=> {
        const id = req.params.id 
        let data= await providerService.increaseCount(id);
        res.status(200).json({
            data: data
        })
      }

    getTopProviders = async (req: Request, res: Response) => {
        const { page, take } = req.query;

        const q = {
            page: parseInt(String(page), 10) || 1,
            take: parseInt(String(take), 10) || 15,
            sex: 'all',
        };

        const data = await providerService.getTopProviders(q);

        res.status(200).json({
            data: data,
        });
    };

    getNewlyJoinedProviders = async (req: Request, res: Response) => {
        const { page, take } = req.query;
        const q = {
            page: parseInt(String(page), 10) || 1,
            take: parseInt(String(take), 10) || 15,
        };

        const data = await providerService.getNewlyJoinedProviders(q);
        res.status(200).json({
            data: data,
        });
    };
}

export default new ProviderController()
