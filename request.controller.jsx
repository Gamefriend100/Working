const db = require('../../../database/models');

const getRequest = async (req, res) => {
    try {

        const userId = req.authUserId;

        const isAdmin = !!(await db.AppUsers.findOne({
            where: {
                userId,
                appId: 2,
                roleId: 2
            }
        }));

        const whereCondition = {};
        if (!isAdmin) {
            whereCondition.userId = userId;
        }
        const requests = await db.SafRequest.findAll({
            where: whereCondition,
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ["associateNumber", "fullName"],
                    include: [
                        {
                            model: db.Branch,
                            as: 'branch',
                            attributes: ["id", "name"]
                        }
                    ]
                },
                {
                    model: db.SafRequestStatus,
                    as: 'status',
                    attributes: ["id", "name"]
                },
                {
                    model: db.SafRequestCancellation,
                    as: 'cancellation',
                    attributes: ["id", "name"]
                }
            ]
        });

        return res.status(200).json(requests);

    } catch (error) {
        console.log("ERROR getRequest:", error);
        return res.status(500).json({
            msg: error.message
        });
    }
};


const getCreateRequest = async (req, res) => {
    try {

        const userId = req.authUserId;
        const { supplyId } = req.body;

        if (!supplyId) {
            return res.status(400).json({
                msg: "El supplyId es obligatorio"
            });
        }
        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado"
            });
        }
        const newRequest = await db.SafRequest.create({
            userId,
            branchId: user.branchId,
            supplyId,
            statusId: 1
        });
        return res.status(201).json({
            msg: "Solicitud creada correctamente",
            request: newRequest
        });
    } catch (error) {
        console.log("ERROR getCreateRequest:", error);
        return res.status(500).json({
            msg: error.message
        });
    }
};


module.exports = {
    getRequest,
    getCreateRequest
};
