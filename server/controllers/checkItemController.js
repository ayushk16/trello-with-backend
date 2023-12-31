import { db } from '../app/models/index.js';

const checkItemModel = db.checkItem;
const checklistModel = db.checkList;
const cardModel = db.card;


export const addCheckItem = async (req, res, next) => {
    const name = req.query.name;
    const checkListId = req.params.id;

    try {
        const checkList = await checklistModel.findOne({ where: { id: checkListId } });
        if (!checkList) {
            const error = new Error('checklist not found');
            error.status = `checklist with id ${checkListId} not found to add checkitem`;
            error.statusCode = 404;
            throw (error);
        }
        else {
            const newCheckItem = {
                name: name,
                idCheckList: checkListId,
                state: 'incomplete',
            }
            const resCheckItem = await checkItemModel.create(newCheckItem);
            res.status(200).json(resCheckItem);
        }
    } catch (error) {
        const Error = error;
        Error.status = `cant create checkItem` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);

    }


}

export const deleteCheckItem = async (req, res, next) => {
    const checkItemId = req.params.idCheckItem;
    const checkListId = req.params.idChecklist;
    try {
        const checkList = await checklistModel.findOne({ where: { id: checkListId } });
        if (!checkList) {
            const error = new Error('checklist not found');
            error.status = `checklist with id ${checkListId} not found to delete checkitem`;
            error.statusCode = 404;
            throw (error);
        }
        else {

            const checkItem = await checkItemModel.findOne({ where: { id: checkItemId, idCheckList: checkListId } });

            if (!checkItem) {
                const error = new Error('checkitem not found');
                error.status = `checkitem with id ${checkItemId} not found`;
                error.statusCode = 404;
                throw (error);
            }
            else {
                const deletedCheckItem = await checkItemModel.destroy({ where: { id: checkItemId } });
                res.status(200).json(checkItem);
            }
        }
    } catch (error) {
        const Error = error;
        Error.status = `checkitem with id ${checkItemId} not found` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);
    }
}

export const updateCheckItem = async (req, res, next) => {
    const state = req.query.state;
    const cardId = req.params.idcard;
    const checkItemId = req.params.idcheckItem;
    try {
        const card = await cardModel.findOne({ where: { id: cardId } });
        if (!card) {
            const error = new Error('card not found');
            error.status = `card with id ${cardId} not found`;
            error.statusCode = 404;
            throw (error);
        }

        else {
            const checkItem = await checkItemModel.findOne({ where: { id: checkItemId } });

            if (!checkItem) {
                const error = new Error('checkitem not found');
                error.status = `checkitem with id ${checkItemId} not found`;
                error.statusCode = 404;
                throw (error);
            }
            else {
                checkItem.state = state;
                const updatedCheckItem = await checkItemModel.update({ state: state }, { where: { id: checkItemId } });
                res.status(200).json(checkItem);
            }
        }

    } catch (error) {
        const Error = error;
        Error.status = `cant update checkItem` || error.status;
        Error.statusCode = 404 || error.statusCode;
        next(Error);

    }



}

