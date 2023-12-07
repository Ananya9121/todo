import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, HttpStatus, Req, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/addTask')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res,@Req() req):Promise<Task> {
    const newTask=await this.taskService.create(createTaskDto,req.user);
    return res.status(HttpStatus.CREATED).json(newTask)
  }

  @Get('/allTask')
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req,@Res() res):Promise<Task[]> {
     const listOfTasks=await this.taskService.findAllTask(req.user);
     return res.status(HttpStatus.CREATED).json(listOfTasks)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id',ParseIntPipe) id: number,@Res() res, @Body() updateTaskDto: UpdateTaskDto):Promise<Task> {
    const updatedTask= await this.taskService.update(id, updateTaskDto);
    return res.status(HttpStatus.OK).json(updatedTask);

  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Res() res):Promise<object> {
    const deletedtask=await this.taskService.remove(+id);
    return res.status(HttpStatus.OK).json(deletedtask);

  }
}
